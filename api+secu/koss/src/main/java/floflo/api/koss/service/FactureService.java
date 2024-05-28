package floflo.api.koss.service;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import floflo.api.koss.dto.FactureDto;
import floflo.api.koss.dto.ProduitFactureDto;
import floflo.api.koss.entity.Facture;
import floflo.api.koss.entity.Produit;
import floflo.api.koss.entity.ProduitFacture;
import floflo.api.koss.repository.FactureRepository;
import floflo.api.koss.repository.ProduitFactureRepository;
import floflo.api.koss.repository.ProduitRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FactureService {

    private final FactureRepository factureRepository;
    private final ProduitFactureRepository produitFactureRepository;
    private final ProduitRepository produitRepository;



    public List<FactureDto> findAll(){

        List<Facture> facture = factureRepository.findAll();
        List<FactureDto> factureDtos = new ArrayList<>();

        for (Facture fr : facture) {
            FactureDto fDto = new FactureDto(fr);
            fDto.setProduits(fr);

            factureDtos.add(fDto);
           
        }

        return factureDtos;


    }


    public FactureDto newFacture(FactureDto factureDto){

        int total = 0;
        Facture  facture = new Facture();
        FactureDto fdto2;

        facture.setDate(Date.valueOf(LocalDate.now()));
        facture.setHeure(Time.valueOf(LocalTime.now()));
        facture = factureRepository.save(facture);

        fdto2 = new FactureDto(facture);

        for (ProduitFactureDto prfDto : factureDto.getProduits()) {
            
            Optional<Produit> produit =  produitRepository.findById(prfDto.getProduit().getId());

            if(produit.isPresent()  && produit.get().getQte_stock() >= prfDto.getQte() ){

                produit.get().setQte_stock(produit.get().getQte_stock() - prfDto.getQte());
                produitRepository.save(produit.get());
                
                ProduitFacture produitFacture = new ProduitFacture();
                produitFacture.setFacture(facture);
                produitFacture.setProduit(produit.get());
                produitFacture.setQte(prfDto.getQte());

                total  += produit.get().getPrix() * prfDto.getQte();

                produitFactureRepository.save(produitFacture);

                ProduitFactureDto  prfdto = new ProduitFactureDto(produitFacture);

                prfdto.getProduit().setCategories(produit.get());

                fdto2.getProduits().add(prfdto);


            }
        }

        facture.setTotal(total);
        fdto2.setTotal(total);
        facture = factureRepository.save(facture);


        // factureDto = findById(facture.getId()).get();
        // factureDto.getProduits().add( new ProduitFactureDto(facture.getProduits().get(0)));

        return fdto2;
    }


    public Optional<FactureDto> findById(Long FactureId){
        
        Optional<Facture> facture = factureRepository.findById(FactureId);

        if(facture.isPresent()){
            FactureDto factureDto = new FactureDto(facture.get());
            factureDto.setProduits(facture.get());
            return Optional.of(factureDto);
        }

        return Optional.empty();
    }
    
}
