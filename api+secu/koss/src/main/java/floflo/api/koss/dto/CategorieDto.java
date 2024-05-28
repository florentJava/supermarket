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
public class CategorieDto {

    private Long id;

    private String nom;

    private String description;

    private List<ProduitDto> produits;


    public CategorieDto(Categorie categorie){

        this.id = categorie.getId();
        this.nom = categorie.getNom();
        this.description = categorie.getDescription();

    }

    public void setProduitsDto(Categorie categorie){

        if (categorie.getProduits() != null) {

            this.produits = new ArrayList<>();

            for(Produit pr : categorie.getProduits()){
                this.produits.add(new ProduitDto(pr));
            }

        }   

    }


    
}
