package floflo.api.koss.entity;

import java.sql.Date;
import java.util.List;

import org.hibernate.annotations.DynamicUpdate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@DynamicUpdate
@Table(name = "employe")
@Getter
@Setter
public class Employe {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "phone")
    private int phone;

    @Column(name = "dateN")
    private Date dateN;

    @Column(name = "sexe")
    private String sexe;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "mdp")
    private String mdp;


	@ManyToMany
    @JoinTable(
        name = "employee_roles",
        joinColumns = @JoinColumn(name = "id_employe"),
        inverseJoinColumns = @JoinColumn(name = "id_role"))
    private List<Role> roles;





}
