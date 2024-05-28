package floflo.api.koss.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import floflo.api.koss.dto.CategorieDto;
import floflo.api.koss.dto.ProduitDto;
import floflo.api.koss.entity.Categorie;
import floflo.api.koss.entity.Produit;
import floflo.api.koss.repository.CategorieRepository;
import floflo.api.koss.repository.ProduitRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProduitService {

    private final ProduitRepository produitRepository;
    private final CategorieRepository categorieRepository;


    public ProduitDto save(ProduitDto produitDto) {
        Produit produit = new Produit();

        produit.setNom(produitDto.getNom());
        produit.setDescription(produitDto.getDescription());
        produit.setQte_critique(produitDto.getQte_critique());
        produit.setQte_stock(produitDto.getQte_stock());
        produit.setPrix( produitDto.getPrix());

        produit = produitRepository.save(produit);
        produitDto.setId(produit.getId());
        produitDto.setCategories(produit);
        return produitDto;
    }

    public void ajouterCategorie(Long produitId, Long categorieId) {

        Optional<Produit> produit = produitRepository.findById(produitId);
        Optional<Categorie> categorie = categorieRepository.findById(categorieId);

        if(produit.isPresent() && categorie.isPresent()) {
            produit.get().getCategories().add(categorie.get());
            produitRepository.save(produit.get());
        }
    }


    public Optional<ProduitDto> findById(Long id) {

        Optional<Produit> produit = produitRepository.findById(id);
        

        if(produit.isPresent()) {
            ProduitDto produitDto = new ProduitDto(produit.get()); 
            produitDto.setCategories(produit.get());           
            return Optional.of(produitDto);
        }

        return Optional.empty();
    }

    public List<ProduitDto> findAll(){

        List<Produit> produits = produitRepository.findAll();
        List<ProduitDto> produitsDto = new ArrayList<>();


        for(Produit pr : produits){
            ProduitDto produitDto = new ProduitDto(pr);
            produitDto.setCategories(pr);
            produitsDto.add(produitDto);
        }

        return produitsDto;



    }

    public Optional<ProduitDto> supprimerCategorie(Long produitId, Long categorieId) {
        Optional<Produit> produit = produitRepository.findById(produitId);
        Optional<Categorie> categorie = categorieRepository.findById(categorieId);

        if(produit.isPresent() && categorie.isPresent()) {
            produit.get().getCategories().remove(categorie.get());
            produitRepository.save(produit.get());

            ProduitDto produitDto = new ProduitDto(produit.get());
            produitDto.setCategories(produit.get());

            return Optional.of(produitDto);
        }

        return Optional.empty();
    }

    public Boolean deleteProduit(Long produitId) {
        Optional<Produit> produit = produitRepository.findById(produitId);

        if(produit.isPresent()) {
            produitRepository.deleteById(produitId);
            return true;
        }

        return false;
    }

    public Optional<ProduitDto>  ravitaller(Long id_produit, int qte){

        Optional<ProduitDto> opProduitDto = findById(id_produit);

        if(opProduitDto.isPresent()){

            Optional<Produit>  produit = produitRepository.findById(id_produit);
            produit.get().setQte_stock(produit.get().getQte_stock()+qte);

            produitRepository.save(produit.get());

            ProduitDto produitDto = new ProduitDto(produit.get());
            produitDto.setCategories(produit.get());
            
            return Optional.of(produitDto);

        }

        return Optional.empty();
    }

    public Optional<ProduitDto> updateProduit(ProduitDto pDto){

        Optional<Produit> produit = produitRepository.findById(pDto.getId());

        if(produit.isPresent()){
            produit.get().setNom(pDto.getNom());
            produit.get().setDescription(pDto.getDescription());
            produit.get().setPrix(pDto.getPrix());
            produit.get().setQte_critique(pDto.getQte_critique());
            produit.get().setCategories(new ArrayList<>());

            for (CategorieDto categorieDto : pDto.getCategories()) {
                Categorie categorie = categorieRepository.findById(categorieDto.getId()).get();
                produit.get().getCategories().add(categorie);
            }

            produitRepository.save(produit.get());  
            ProduitDto produitDto = new ProduitDto(produit.get());  
            produitDto.setCategories(produit.get());

            return Optional.of(produitDto);
        }

        return Optional.empty();

    }
    
}