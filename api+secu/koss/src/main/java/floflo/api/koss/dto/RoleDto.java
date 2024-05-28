package floflo.api.koss.dto;

import floflo.api.koss.entity.Role;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class RoleDto {

    private Long id;
    private String nom;
    private String description;


    public RoleDto(Role role){
        this.id = role.getId();
        this.nom = role.getNom();
        this.description = role.getDescription();
    }

}
