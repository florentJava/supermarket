package floflo.api.koss.dto;

import java.util.ArrayList;
import java.util.List;

import floflo.api.koss.entity.Categorie;
import floflo.api.koss.entity.Produit;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@RequiredArgsConstructor
public class ProduitDto {

	
	private Long id;

	private String nom;

	private String description;

	private int qte_stock;

	private int qte_critique;

	private int prix;

    private List<CategorieDto> categories = new ArrayList<>();

	

	public ProduitDto( Produit produit){

		this.id = produit.getId();
		this.nom = produit.getNom();
		this.description = produit.getDescription();
		this.qte_critique = produit.getQte_critique();
		this.qte_stock = produit.getQte_stock();
		this.prix = produit.getPrix();
		
	}

	public void setCategories(Produit produit){
		if (produit.getCategories() != null) {

			this.categories = new ArrayList<>();

			for(Categorie  cat: produit.getCategories()){
                this.categories.add(new CategorieDto(cat));
            }
			
		}
	}

    
}
