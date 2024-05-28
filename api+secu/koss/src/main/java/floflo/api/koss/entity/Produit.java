package floflo.api.koss.entity;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.DynamicUpdate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@DynamicUpdate
@Table(name = "produit")
@Getter
@Setter
public class Produit {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "nom")
	private String nom;

    @Column(name = "description")
	private String description;

    @Column(name = "qte_stock")
	private int qte_stock;

    @Column(name = "qte_critique")
	private int  qte_critique;

    @Column(name = "prix")
    private int prix;

	@ManyToMany
    @JoinTable(
        name = "categorie_produit",
        joinColumns = @JoinColumn(name = "id_produit"),
        inverseJoinColumns = @JoinColumn(name = "id_categorie"))
    private List<Categorie> categories = new ArrayList<>();


    public void setPrix(int prix){
        this.prix = prix;
    }
    
}
