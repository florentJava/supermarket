package floflo.api.koss.dto;

import floflo.api.koss.entity.ProduitFacture;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class ProduitFactureDto {

    private Long id;
    private FactureDto facture;



    private ProduitDto produit;
    private int qte;


    public ProduitFactureDto(ProduitFacture pr){

        this.id = pr.getId();
        this.qte = pr.getQte();

        this.facture = new FactureDto(pr.getFacture());
        this.produit= new ProduitDto(pr.getProduit());

    }
    
}
