package sidim.doma.wc.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.Set;
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
@Table(name = "frames", schema = "win_calc_schema")
public class Frame {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @ColumnDefault("nextval('win_calc_schema.frames_id_seq')")
  @Column(name = "id", nullable = false)
  private Integer id;

  @Column(name = "name")
  private String name;

  @ColumnDefault("CURRENT_TIMESTAMP")
  @Column(name = "created_at")
  private Instant createdAt;

  @ColumnDefault("CURRENT_TIMESTAMP")
  @Column(name = "updated_at")
  private Instant updatedAt;

  @OneToMany(mappedBy = "frame", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<FrameBlock> frameBlocks;

}