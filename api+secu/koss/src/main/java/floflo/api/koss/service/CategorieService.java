package floflo.api.koss.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import floflo.api.koss.dto.CategorieDto;
import floflo.api.koss.entity.Categorie;
import floflo.api.koss.repository.CategorieRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategorieService {

    private final CategorieRepository categorieRepository;
    private final ProduitService produitService;


    public CategorieDto save(CategorieDto categorieDto) {
        Categorie categorie = new Categorie();

        categorie.setNom(categorieDto.getNom());
        categorie.setDescription(categorieDto.getDescription());

        categorie = categorieRepository.save(categorie);
        categorieDto.setId(categorie.getId());
        return categorieDto;
    }


    public Optional<CategorieDto> findById(Long id) {

        Optional<Categorie> categorie = categorieRepository.findById(id);
        

        if(categorie.isPresent()) {
            CategorieDto categorieDto = new CategorieDto();
            categorieDto.setId(categorie.get().getId());
            categorieDto.setNom(categorie.get().getNom());
            categorieDto.setDescription(categorie.get().getDescription());
            return Optional.of(categorieDto);
        }

        return Optional.empty();
    }

    //Ajouter un produit a une categorie
    public Optional<CategorieDto> ajouterPropuits(Long produitId, Long categorieId){

        produitService.ajouterCategorie(produitId, categorieId);

        Optional<Categorie> categorie = categorieRepository.findById(categorieId);

        if(categorie.isPresent()) {


            CategorieDto categorieDto = new CategorieDto(categorie.get());
            categorieDto.setProduitsDto(categorie.get());

            return Optional.of(categorieDto);
        }

        return Optional.empty();

    }

    //Recuperer toutes les categories
    public List<CategorieDto> findAll(){

        List<CategorieDto> categorieDtos = new ArrayList<>();

        for(Categorie cat : categorieRepository.findAll()){
            CategorieDto categorieDto = new CategorieDto(cat);
            categorieDto.setProduitsDto(cat);
            categorieDtos.add(categorieDto);
        };

        return categorieDtos;
    }

    
}
