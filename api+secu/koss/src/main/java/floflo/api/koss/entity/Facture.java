package floflo.api.koss.entity;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.DynamicUpdate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@DynamicUpdate
@Table(name = "facture")
@Getter
@Setter
public class Facture {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "dateF")
    private Date date;

    @Column(name = "heure")
    private Time heure;

    @Column(name = "total")
    private double total;

    @OneToMany(
        mappedBy = "facture",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<ProduitFacture> produits = new ArrayList<>();


    // public Facture(){
    //     this.date = Date.valueOf(LocalDate.now());
    //     this.heure = Time.valueOf(LocalTime.now());
    // }


}
