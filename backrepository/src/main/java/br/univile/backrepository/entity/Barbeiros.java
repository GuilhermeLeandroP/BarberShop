// package br.univile.backrepository.entity;

// import java.util.Date;

// import org.springframework.format.annotation.DateTimeFormat;

// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.Temporal;
// import jakarta.persistence.TemporalType;

// @Entity
// public class Barbeiros {
        
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private long id;

//     @Column(nullable = false)
//     private String nome;

//     @Column(nullable = false, unique = true)
//     private String email;

//     @Column(nullable = false)
//     private String foto;
    
//     @Column(nullable = false)
//     private Integer anosExp;

//     @Temporal(TemporalType.DATE)
//     @DateTimeFormat(pattern = "yyyy-MM-dd")
//     private Date dataNascimento;

//     public long getId() {
//         return id;
//     }

//     public void setId(long id) {
//         this.id = id;
//     }

//     public String getNome() {
//         return nome;
//     }

//     public void setNome(String nome) {
//         this.nome = nome;
//     }

//     public String getEmail() {
//         return email;
//     }

//     public void setEmail(String email) {
//         this.email = email;
//     }

//     public String getFoto() {
//         return foto;
//     }

//     public void setFoto(String foto) {
//         this.foto = foto;
//     }

//     public Integer getAnosExp() {
//         return anosExp;
//     }

//     public void setAnosExp(Integer anosExp) {
//         this.anosExp = anosExp;
//     }

//     public Date getDataNascimento() {
//         return dataNascimento;
//     }

//     public void setDataNascimento(Date dataNascimento) {
//         this.dataNascimento = dataNascimento;
//     }

    
    
    
// }
