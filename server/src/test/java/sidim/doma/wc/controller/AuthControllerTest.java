package sidim.doma.wc.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.security.Principal;
import lombok.val;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.test.web.servlet.MockMvc;
import sidim.doma.wc.dto.Credentials;
import sidim.doma.wc.dto.jwt.JwtResponse;
import sidim.doma.wc.dto.jwt.RefreshJwtRequest;
import sidim.doma.wc.exception.LoginCredentialException;
import sidim.doma.wc.service.AuthService;
import sidim.doma.wc.service.CustomUserDetailsService;
import sidim.doma.wc.util.jwt.JwtUtil;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
class AuthControllerTest {

  private static final String BASE_URL = "/api/v1/auth";

  @MockBean
  private AuthService authService;

  @MockBean
  private CustomUserDetailsService customUserDetailsService;

  @MockBean
  private JwtUtil jwtUtil;

  @Autowired
  private MockMvc mockMvc;

  private static final String EMAIL = "test_email@test.com";
  private static final String PASSWORD = "password";
  private static final String ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
  private static final String REFRESH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  @Autowired
  private ObjectMapper objectMapper;

  @Test
  void login_WithValidCredentials_ShouldReturnAccessToken() throws Exception {
    val credentials = new Credentials(EMAIL, PASSWORD);

    when(authService.login(credentials)).thenReturn(new JwtResponse(ACCESS_TOKEN, REFRESH_TOKEN));

    val result = mockMvc.perform(post(BASE_URL + "/login")
            .content(objectMapper.writeValueAsString(credentials))
            .contentType("application/json"))
        .andExpect(status().isOk()).andReturn();

    val content = result.getResponse().getContentAsString();
    val response = objectMapper.readValue(content, JwtResponse.class);

    assertEquals(ACCESS_TOKEN, response.accessToken());
    assertEquals(REFRESH_TOKEN, response.refreshToken());
  }

  @Test
  void login_WithInvalidCredentials_ShouldReturnUnauthorized() throws Exception {
    val credentials = new Credentials(EMAIL, PASSWORD);

    doThrow(new LoginCredentialException("Invalid login credentials", HttpStatus.UNAUTHORIZED))
        .when(authService).login(credentials);

    mockMvc.perform(post(BASE_URL + "/login")
            .content(objectMapper.writeValueAsString(credentials))
            .contentType("application/json"))
        .andExpect(status().isUnauthorized()).andReturn();
  }

  @Test
  void getAccessToken_WithValidRefreshToken_ShouldReturnAccessToken() throws Exception {
    val jwtResponse = new JwtResponse(ACCESS_TOKEN, null);
    val request = new RefreshJwtRequest(REFRESH_TOKEN);

    when(authService.getAccessToken(REFRESH_TOKEN)).thenReturn(jwtResponse);

    val result = mockMvc.perform(post(BASE_URL + "/refresh")
            .content(objectMapper.writeValueAsString(request))
            .contentType("application/json"))
        .andExpect(status().isOk()).andReturn();

    val content = result.getResponse().getContentAsString();
    val response = objectMapper.readValue(content, JwtResponse.class);

    assertEquals(ACCESS_TOKEN, response.accessToken());
    assertNull(response.refreshToken());
  }

  @Test
  void getAccessToken_WithInvalidRefreshToken_ShouldReturnUnauthorized() throws Exception {
    val request = new RefreshJwtRequest("invalid_refresh_token");

    doThrow(new LoginCredentialException("Invalid refresh token", HttpStatus.BAD_REQUEST))
        .when(authService).getAccessToken(request.refreshToken());

    mockMvc.perform(post(BASE_URL + "/refresh")
            .content(objectMapper.writeValueAsString(request))
            .contentType("application/json"))
        .andExpect(status().isBadRequest());
  }

  @Test
  void login_WithEmptyRequestBody_ShouldReturnBadRequest() throws Exception {
    mockMvc.perform(post(BASE_URL + "/login")
            .content("")
            .contentType("application/json"))
        .andExpect(status().isBadRequest());
  }

  @Test
  void getAccessToken_WithEmptyRequestBody_ShouldReturnBadRequest() throws Exception {
    mockMvc.perform(post(BASE_URL + "/refresh")
            .content("")
            .contentType("application/json"))
        .andExpect(status().isBadRequest());
  }

  @Test
  void login_WithInvalidJson_ShouldReturnBadRequest() throws Exception {
    String invalidJson = "{email: 'test_email@test.com', password: }";

    mockMvc.perform(post(BASE_URL + "/login")
            .content(invalidJson)
            .contentType("application/json"))
        .andExpect(status().isBadRequest());
  }

  @Test
  void logout_ShouldReturnNoContent() throws Exception {
    val mockPrincipal = mock(Principal.class);

    mockMvc.perform(delete(BASE_URL + "/logout")
            .principal(mockPrincipal))
        .andExpect(status().isNoContent());
  }

  @Test
  @WithAnonymousUser
  void logout_WithNullPrincipal_ShouldReturnUnauthorized() throws Exception {
    mockMvc.perform(delete(BASE_URL + "/logout"))
        .andExpect(status().isUnauthorized());
  }
}