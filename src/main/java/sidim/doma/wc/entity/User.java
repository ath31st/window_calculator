package sidim.doma.wc.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users", schema = "win_calc_schema")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @ColumnDefault("nextval('win_calc_schema.users_id_seq')")
  @Column(name = "id", nullable = false)
  private Integer id;

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "email", nullable = false)
  private String email;

  @Column(name = "password", nullable = false)
  private String password;

  @Column(name = "role")
  private Integer role;

  @ColumnDefault("true")
  @Column(name = "is_active")
  private Boolean isActive;

  @ColumnDefault("CURRENT_TIMESTAMP")
  @Column(name = "created_at")
  private Instant createdAt;

  @ColumnDefault("CURRENT_TIMESTAMP")
  @Column(name = "updated_at")
  private Instant updatedAt;

}