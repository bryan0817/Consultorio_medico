/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     20/09/2022 6:21:52 a. m.                     */
/*==============================================================*/


/*==============================================================*/
/* Table: agenda_citas                                          */
/*==============================================================*/
create table agenda_citas
(
   id_agenda_cita       bigint not null auto_increment  comment '',
   id_medico            bigint not null  comment '',
   fecha_cita_medica    date not null  comment '',
   hora_cita_medica     time not null  comment '',
   numero_consultorio   int not null  comment '',
   primary key (id_agenda_cita)
);

/*==============================================================*/
/* Table: medicos                                               */
/*==============================================================*/
create table medicos
(
   id_medico            bigint not null auto_increment  comment '',
   nombres_medicos      varchar(100) not null  comment '',
   apellidos_medicos    varchar(100) not null  comment '',
   documento_medicos    bigint not null  comment '',
   email_medicos        varchar(150) not null  comment '',
   celular_medicos      bigint not null  comment '',
   edad_medicos         int not null  comment '',
   especialidad_medicos varchar(200) not null  comment '',
   primary key (id_medico)
);

alter table agenda_citas add constraint fk_agenda_c_reference_medicos foreign key (id_medico)
      references medicos (id_medico) on delete cascade on update cascade;

