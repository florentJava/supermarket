package floflo.api.koss.dto;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import floflo.api.koss.entity.Employe;
import floflo.api.koss.entity.Role;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class EmployeDto {

    private Long id;
    private String nom;
    private String prenom;
    private int phone;
    private String sexe;
    private String userName;
    private Date dateN;
    private String mdp;
    private List<RoleDto> rolesDto = new ArrayList<>();

    public EmployeDto(Employe employe){
        this.id = employe.getId();
        this.nom = employe.getNom();
        this.prenom = employe.getPrenom();
        this.sexe = employe.getSexe();
        this.userName = employe.getUserName();
        this.phone = employe.getPhone();
        this.mdp = employe.getMdp();
        this.dateN = employe.getDateN();

        for (Role role : employe.getRoles()) {
            this.rolesDto.add(new RoleDto(role));
        }
    }
}
