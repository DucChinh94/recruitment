--- level---
Create table rank(
                     id  NUMBER(4) primary key NOT NULL,
                     code nvarchar2(50) NOT NULL,
                     description nvarchar2(50),
                     is_delete INTEGER NOT NULL
);

---- status_job ---
Create table status_job(
                           id NUMBER(4) primary key,
                           code nvarchar2(50),
                           description nvarchar2(50),
                           is_delete INTEGER NOT NULL
);

Create table status_job_register(
                                    id NUMBER(4) primary key,
                                    code nvarchar2(50),
                                    description nvarchar2(50),
                                    is_delete INTEGER NOT NULL
);

----academic level (trình độ học vấn)----
Create table academic_level(
                               id NUMBER(4) primary key,
                               code nvarchar2(50), --- trình độ học vấn---
                               description nvarchar2(50),
                               is_delete INTEGER NOT NULL
);

CREATE TABLE working_form(
                             id NUMBER NOT NULL,
                             code VARCHAR(50) NOT NULL,
                             description  VARCHAR(100) NOT NULL,
                             is_delete INTEGER NOT NULL,
                             PRIMARY KEY(id )
);


CREATE TABLE users(
                      id NUMBER(4) NOT NULL  PRIMARY KEY,
                      name VARCHAR(50) NOT NULL,
                      user_name VARCHAR(20) NOT NULL UNIQUE,
                      email VARCHAR(50) NOT NULL UNIQUE ,
                      password VARCHAR(60) NOT NULL,
                      phone_number VARCHAR(20) NOT NULL UNIQUE,
                      home_town VARCHAR(100) ,
                      gender VARCHAR(100) ,
                      birth_day DATE NOT NULL ,
                      avatar VARCHAR(100),
                      activate INTEGER NOT NULL,
                      is_delete INTEGER NOT NULL
);


Create table otp(
                    id NUMBER(4) primary key,
                    code varchar(20) NOT NULL,
                    issue_at DATE NOT NULL,
                    user_id  NUMBER(4)  NOT NULL,
                    CONSTRAINT fk_user_otp FOREIGN KEY(user_id) REFERENCES users(id)
);


----file (hồ sơ)----
Create table profiles(
                         user_id  NUMBER(4) PRIMARY KEY,
                         skill varchar(50),
                         number_years_experience NUMBER(4),  ---số năm kinh nghiệm ---
                         academic_name_id number(4),
                         desired_salary varchar(50), --mức lương mong muốn ---
                         desired_working_address varchar(50), --địa chỉ làm việc mong muốn ---
                         desired_working_form varchar(50), --hình thức làm việc mong muốn
                         is_delete INTEGER NOT NULL,
                         CONSTRAINT fk_user_profile    FOREIGN KEY (user_id)    REFERENCES users (id),
                         CONSTRAINT fk_academic_level    FOREIGN KEY (academic_name_id)    REFERENCES academic_level(id)
);


CREATE TABLE roles(
                     id NUMBER(4) NOT NULL,
                     code VARCHAR(20) NOT NULL UNIQUE,
                     description VARCHAR(50) NOT NULL,
                     is_delete INTEGER NOT NULL,
                     PRIMARY KEY(id)
);

CREATE TABLE permisstion(
                            user_id NUMBER(4) NOT NULL,
                            role_id NUMBER(4) NOT NULL,
                            PRIMARY KEY(user_id, role_id),
                            CONSTRAINT fk_user    FOREIGN KEY (user_id)    REFERENCES users (id),
                            CONSTRAINT fk_role    FOREIGN KEY (role_id)    REFERENCES roles(id)
);


CREATE TABLE job(
                    id NUMBER(4) PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    job_position_id NUMBER(4) NOT NULL,
                    number_experience VARCHAR(100) NOT NULL,
                    working_form_id  NUMBER(4) NOT NULL,
                    address_work VARCHAR(100) NOT NULL,
                    academic_level_id NUMBER(4) NOT NULL,
                    rank_id NUMBER(4) NOT NULL,
                    qty_person INTEGER NOT NULL,
                    start_recruitment_date DATE NOT NULL,
                    due_date DATE NOT NULL,
                    skills VARCHAR(100) NOT NULL,
                    description VARCHAR(100) NOT NULL,
                    interest VARCHAR(100) NOT NULL,
                    job_requirement VARCHAR(100) NOT NULL,
                    salary_max INTEGER NOT NULL,
                    salary_min INTEGER NOT NULL,
                    contact_id NUMBER(4) NOT NULL,
                    create_id  NUMBER(4) NOT NULL,
                    create_date DATE NOT NULL,
                    update_id  NUMBER(4) NOT NULL,
                    update_date DATE NOT NULL,
                    status_id NUMBER(4) NOT NULL,
                    views  INTEGER ,
                    is_delete INTEGER NOT NULL,

                    CONSTRAINT fk_working_form FOREIGN KEY (working_form_id)  REFERENCES working_form(id),
                    CONSTRAINT fk_academic_level_job FOREIGN KEY (academic_level_id)  REFERENCES academic_level (id),
                    CONSTRAINT fk_rank FOREIGN KEY (rank_id)  REFERENCES rank (id),
                    CONSTRAINT fk_contact FOREIGN KEY (contact_id)  REFERENCES users (id),
                    CONSTRAINT fk_update FOREIGN KEY (update_id)  REFERENCES users (id),
                    CONSTRAINT fk_create FOREIGN KEY (create_id)  REFERENCES users (id),
                    CONSTRAINT fk_status_job FOREIGN KEY (status_id)  REFERENCES status_job(id)
);

CREATE TABLE jobs_register(
                              job_id NUMBER NOT NULL,
                              user_id NUMBER NOT NULL,
                              date_register DATE NOT NULL ,
                              date_interview DATE,
                              method_interview VARCHAR(50),
                              address_interview VARCHAR(50),
                              status_id NUMBER NOT NULL,
                              reason VARCHAR(50),
                              cv_file VARCHAR(50) NOT NULL,
                              media_type VARCHAR(50)NOT NULL,
                              is_delete INTEGER NOT NULL,
                              PRIMARY KEY(job_id, user_id ),

                              CONSTRAINT fk_job_register  FOREIGN KEY (job_id)   REFERENCES job(id),
                              CONSTRAINT fk_user_register   FOREIGN KEY (user_id)    REFERENCES users (id),
                              CONSTRAINT fk_reg_status FOREIGN KEY (status_id)  REFERENCES status_job_register(id)
);



Create table type(
                     id NUMBER(4) primary key,
                     code nvarchar2(50),
                     description nvarchar2(50),
                     is_delete INTEGER NOT NULL
);

Create table job_position(
                     id NUMBER(4) primary key,
                     code nvarchar2(50),
                     description nvarchar2(50),
                     is_delete INTEGER NOT NULL
);

CREATE TABLE notifications(
                              id NUMBER NOT NULL,
                              sender_id  NUMBER NOT NULL,
                              receiver_id  NUMBER NOT NULL,
                              create_date DATE NOT NULL,
                              content  varchar(200) NOT NULL,
                              res_id NUMBER NOT NULL, -- là job_id hoặc là job_reg_id;
                              type_id NUMBER NOT NULL,
                              is_delete INTEGER NOT NULL,
                              PRIMARY KEY(id )   ,
                              CONSTRAINT fk_type FOREIGN KEY (type_id)  REFERENCES type (id),
                              CONSTRAINT fk_sender_id  FOREIGN KEY (sender_id)   REFERENCES users (id),
                              CONSTRAINT fk_receiver_id   FOREIGN KEY (receiver_id)    REFERENCES users (id)
);


CREATE TABLE company(
                        id NUMBER NOT NULL,
                        name  VARCHAR(200) NOT NULL,
                        email VARCHAR(100) NOT NULL,
                        hotline VARCHAR(100) NOT NULL,
                        date_incoporation DATE NOT NULL, -- ngày thành lập công ty
                        tax_code VARCHAR(100) NOT NULL,
                        tax_date DATE NOT NULL,-- Ngày cấp mã số thuế
                        tax_place VARCHAR(50) NOT NULL, -- Nơi cấp mã số thuế
                        head_office VARCHAR(50) NOT NULL, -- trụ sở chính
                        number_staff INTEGER NOT NULL, -- số lượng nhân viên
                        link_web VARCHAR(50) NOT NULL, -- trụ sở chính
                        description VARCHAR(50) NOT NULL, -- mô tả công ty
                        avatar VARCHAR(50) NOT NULL, -- ảnh đại diện
                        backdrop_img VARCHAR(50) NOT NULL, -- ảnh bìa
                        is_delete INTEGER NOT NULL,
                        PRIMARY KEY(id )
);