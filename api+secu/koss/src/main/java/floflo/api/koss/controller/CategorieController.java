package floflo.api.koss.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import floflo.api.koss.dto.CategorieDto;
import floflo.api.koss.service.CategorieService;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categories")
public class CategorieController {

    private final CategorieService categorieService;

    /*
     * en registrer une nouvelle categorie
     */
    @PostMapping("")
    public ResponseEntity<CategorieDto> save(@RequestBody CategorieDto categorieDto) {
        return ResponseEntity.ok(categorieService.save(categorieDto));
    }

    /*
     * recuperer toutes les  categories
     */
    @GetMapping("")
    public List<CategorieDto> findAll() {
        return categorieService.findAll();
    }

    /*
     * Ajouter un produit a une categorie
     */
    @PostMapping("{categorieId}/produits/{produitId}")
    public ResponseEntity<CategorieDto> ajouterCategorie(@PathVariable Long produitId, @PathVariable Long categorieId) {
        //TODO: process POST request

        Optional<CategorieDto> catDto = categorieService.ajouterPropuits(produitId, categorieId);

        if(catDto.isPresent())
            return ResponseEntity.ok(catDto.get());
        
        return ResponseEntity.notFound().build();
    }
    
    


    
}
