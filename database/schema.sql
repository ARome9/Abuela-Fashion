drop table questions, answers, photos;
create table questions (
  question_id int PRIMARY KEY,
  product_id int,
  question_body varchar(1000),
  question_date bigint,
  asker_name varchar(60),
  asker_email varchar(60),
  reported int,
  question_helpfulness int
);

CREATE TABLE answers (
  answer_id int PRIMARY KEY,
  question_id int references questions(question_id),
  body varchar(1000),
  "date" bigint,
  answerer_name varchar(60),
  answerer_email varchar(60),
  reported int,
  helpfulness int
);

CREATE TABLE photos (
  id int PRIMARY KEY,
  answer_id int references answers(answer_id),
  "url" varchar(200)
);

COPY questions(question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness)
FROM '/Users/s130655/Documents/HackReactor/Abuela-Fashion/database/files/questions.csv'
DELIMITER ','
CSV HEADER;

COPY answers(answer_id, question_id, body, "date", answerer_name, answerer_email, reported, helpfulness)
FROM '/Users/s130655/Documents/HackReactor/Abuela-Fashion/database/files/answers.csv'
DELIMITER ','
CSV HEADER;

COPY photos(id, answer_id, "url")
FROM '/Users/s130655/Documents/HackReactor/Abuela-Fashion/database/files/answers_photos.csv'
DELIMITER ','
CSV HEADER;