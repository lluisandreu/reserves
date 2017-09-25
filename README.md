# Mòdul "Reserves" per Drupal 7
Permet crear espais reservables per ajuntaments o entitats

## 1. Instal·lació i dependències

1. Posa el mòdul dins la carpeta de sites/all/modules o sites/modules si és una multi-instal·lació
2. Descarrega les dependències: 
	1. [Date](https://www.drupal.org/project/date)
	2. [Office hours](https://www.drupal.org/project/office_hours)
	3. [Entity API](https://www.drupal.org/project/entity)
	4. [Libraries](https://www.drupal.org/project/libraries)
	5. [Fullcalendar](https://fullcalendar.io/download/) i copia'l dins /sites/all/libraries amb el nom de "fullcalendar"
	6. [MomentJS](https://momentjs.com/downloads/moment.js). Crea una carpeta a /sites/all/libraries amb el nom de "moment" i copia l'arxiu moment.js.
3. Instal·la el mòdul "Reserves". Els altres dos submòduls s'instal·laran automàticament. 

## 2. Creació d'espais

1. Verifica que tens els permisos pertinents per crear i manipular espais. Sino els tens els pots modificar a admin/people/permissions
2. Pots crear un nou espai a admin/structure/espais/manage/add
3. Omple els camps obligatoris i guarda l'espai. Una vegada guardat tocaria ser visible a /espais
4. Edita i administra tots els espais a admin/structure/espais/manage

## 3. Creació de reserves

1. Verifica que l'usuari té els permisos de creació de reserves.
2. Ves a l'espai que vols reservar i selecciona una franja de temps al dia que vols reservar. Es descobrirà un formulari que hauràs d'omplir per crear la reserva.

## 4. Manipulació de reserves

1. Totes les reserves futures i presents es poden consultar i modificar a admin/structure/reserves/manage. 
2. Per defecte totes les reserves es guarden "Aceptades" pero hi hauria la posibilitat que les reserves es guardésin com a "Pendents" i després un supervisor les hauria d'acceptar.

## 5. Usuaris

1. Només els usuaris amb el rol 'usuari_reserves' poden crear reserves. Els usuaris per registrar-se hauran d'accedir a reserves/usuaris/nou. 
2. Els usuaris s'hauran d'activar manualment per una persona amb permisos. Una vegada actius podran accedir a la web.
3. Els usuaris prèviament registrats podran tornar a accedir a la web o bé a través de user/login o reserves/usuaris/login

## Rutes d'accés

* Registre d'usuaris: reserves/usuaris/nou
* Login d'usuaris: reserves/usuaris/login
* Espais: /espais
* Espai en concret: /espai/ID

## Resolució de problemes

Pots obrir un tiquet a https://github.com/lluisandreu/reserves/issues o contactar directament amb en Lluís Andreu a través de info@lluisandreu.com.


Mòdul Drupal per **Lluís Andreu Oliver Obrador**
http://www.lluisandreu.com
