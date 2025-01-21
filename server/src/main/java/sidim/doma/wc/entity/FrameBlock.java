package sidim.doma.wc.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.Instant;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "frame_blocks", schema = "win_calc_schema")
public class FrameBlock {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @ColumnDefault("nextval('win_calc_schema.frame_blocks_id_seq')")
  @Column(name = "id", nullable = false)
  private Integer id;

  @ManyToOne(fetch = FetchType.LAZY)
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JoinColumn(name = "frame_id")
  private Frame frame;

  @Column(name = "name")
  private String name;

  @Column(name = "is_window_size_enabled")
  private Boolean isWindowSizeEnabled;

  @Column(name = "input_title")
  private String inputTitle;

  @Column(name = "description", length = Integer.MAX_VALUE)
  private String description;

  @ColumnDefault("CURRENT_TIMESTAMP")
  @Column(name = "created_at")
  private Instant createdAt;

  @ColumnDefault("CURRENT_TIMESTAMP")
  @Column(name = "updated_at")
  private Instant updatedAt;

  @OneToMany(mappedBy = "frameBlock", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<BlockTable> blockTables;

  @Size(max = 255)
  @NotNull
  @ColumnDefault("''")
  @Column(name = "formula", nullable = false)
  private String formula;

}