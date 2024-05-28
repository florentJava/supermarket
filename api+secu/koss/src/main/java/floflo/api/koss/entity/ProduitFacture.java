package floflo.api.koss.entity;

import org.hibernate.annotations.DynamicUpdate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@DynamicUpdate
@Table(name = "facture_produit")
@Getter
@Setter
public class ProduitFacture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(
        cascade = { 
        CascadeType.PERSIST, 
        CascadeType.MERGE 
        })
    @JoinColumn(name="id_facture")
    private Facture facture;

    @ManyToOne(
        cascade = { 
        CascadeType.PERSIST, 
        CascadeType.MERGE 
        })
    @JoinColumn(name="id_produit")
    private Produit produit;

    @Column(name = "qte")
    private int qte;
    
}
