package floflo.api.koss.dto;
import java.util.ArrayList;
import java.util.List;

import floflo.api.koss.entity.Facture;
import floflo.api.koss.entity.ProduitFacture;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class FactureDto {

    private Long id;
    private String date;
    private String heure;
    private double total;
    private List<ProduitFactureDto> produits = new ArrayList<>();


    public FactureDto(Facture facture){
        this.id = facture.getId();
        this.date = facture.getDate().toString();
        this.heure = facture.getHeure().toString();
        this.total = facture.getTotal();
    }

    public void setProduits(Facture facture){

        if (facture.getProduits() != null) {

            this.produits = new ArrayList<>();

            for (ProduitFacture pr : facture.getProduits()) {

                ProduitFactureDto prDto = new ProduitFactureDto(pr);
                this.produits.add(prDto);
                
            }
            
        }
    }
    
}
