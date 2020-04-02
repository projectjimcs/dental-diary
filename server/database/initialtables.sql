/* Company Table */
DROP TABLE IF EXISTS companies;
CREATE TABLE companies (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR NOT NULL,
  uuid UUID NOT NULL,
  email VARCHAR,
  phone INTEGER,
  address VARCHAR,
  timezone VARCHAR,
  status VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

/* Role Table */
DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
  id SERIAL PRIMARY KEY NOT NULL,
  key VARCHAR,
  name VARCHAR
);

/* Account Type Table */
DROP TABLE IF EXISTS account_types;
CREATE TABLE account_types (
  id SERIAL PRIMARY KEY NOT NULL,
  key VARCHAR,
  name VARCHAR
);

/* USER TABLE */
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  company_id INTEGER REFERENCES companies(id),
  uuid UUID NOT NULL,
  password VARCHAR NOT NULL,
  firstname VARCHAR,
  lastname VARCHAR,
  email VARCHAR,
  phone INTEGER,
  address VARCHAR,
  role_id INTEGER REFERENCES roles(id),
  account_type_id INTEGER REFERENCES account_types(id),
  status VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

/* PATIENT TABLE */
DROP TABLE IF EXISTS patients;
CREATE TABLE patients (
  id SERIAL PRIMARY KEY NOT NULL,
  company_id INTEGER REFERENCES companies(id),
  uuid UUID NOT NULL,
  firstname VARCHAR,
  lastname VARCHAR,
  email VARCHAR,
  phone INTEGER,
  address VARCHAR,
  status VARCHAR,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

/* PATIENT APPOINTMENTS TABLE */
DROP TABLE IF EXISTS appointments;
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY NOT NULL,
  company_id INTEGER REFERENCES companies(id),
  patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
  booked_with INTEGER REFERENCES users(id),
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

