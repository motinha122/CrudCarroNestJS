 CREATE TABLE IF NOT EXISTS car (
  id SERIAL PRIMARY KEY,
  plate VARCHAR(8) NOT NULL UNIQUE,
  model VARCHAR(100) NOT NULL,
  color VARCHAR(20) NOT NULL,
  price MONEY NOT NULL,
  description TEXT,
  manufacture VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS person (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  dob DATE NOT NULL,
  cpf_cnpj VARCHAR(14) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS accessory (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  manufacture VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS car_person (
  FK_car_id INTEGER REFERENCES car(id),
  FK_person_id INTEGER REFERENCES person(id),
  rent_date DATE NOT NULL,
  rent_duration INTEGER NOT NULL,
  rent_price MONEY NOT NULL
);

CREATE TABLE IF NOT EXISTS car_accessory (
  FK_car_id INTEGER REFERENCES car(id),
  FK_accessory_id INTEGER REFERENCES accessory(id)
);

