# GL02_MSMZ

**Members** 
GL02_MSMZ (Developper) : Sébastien BACOUP, Zoé BOUTIN, Matéo CONDAT, Maxence JAULIN
GL02_AngloFrenchTeam (Maintainer) : Soraya Lizeth MAQUEDA GUTIERREZ, WANG Ziyan, ZHANG Xizhu

The goal of this project is to create a software according to the specifications defined in the first deliverable [Document serving as specifications] AngloFrenchTeam_cc_SujetA.pdf.

## Features

- SPEC01 : Search for the Timeslot and all realated information for a given course.
- SPEC02 : Check the schedule and maximum Capacity of a precise room.
- SPEC03 : Search for which rooms are available for a defined Daytime.
- SPEC04 : Export a file in iCalendar format between two given dates.
- SPEC05 : Visualize room occupancy rates.
- SPEC06 : Visualize a chart of room types by Capacity.
- SPEC_NF_01 : The software is able to check the quality of the university schedule data to avoid overflow of rooms.

## Commands

- readMe : displays the readMe file and its information in the console


- Form : node caporalCli.js *command* *file*

- displaySchedule : displays the general schedule based on the information entered in the file .cru
- searchCourse (SPEC01) : give the informations for a given course
- capacityRoom (SPEC02) : give the maximum capacity of a precise room
- roomAvalaible (SPEC03) : give the room avalaible for a period of time in a day
- iCalendar (SPEC04) : permit a user to create all his UE's appointments in a .ics file. When opened in a calendar, it will takes all the appointments for the desired period
- roomOccupancyChart (SPEC05) : generates an .html file that displays the occupancy average according to the number of rooms (Vega-Lite)
- roomCapacityChart (SPEC06) : generates an .html file that displays the capacity according to the number of rooms (Vega-Lite)
- checkScheduleQuality (SPEC_NF_01) : check the quality of the university schedule data to avoid overflow of rooms.

## TODO

- Exceptions/errors management
- Do some tests
- Documentation

## Context

This project was carried out as part of a course on the foundations of software engineering ([GL02](https://moodle.utt.fr/course/view.php?id=1423)) led by M.Tixier at [l'Université de Technologie de Troyes (UTT)](https://www.utt.fr).

You can find the subject on this repository [here](./doc/topic/Projet GL02 A21_SRU_SujetA.pdf) and the specifications [here](./doc/AngloFrenchTeam_cc_SujetA.pdf).

## Copyright

Copyright Developper Sébastien Bacoup, Zoé Boutin, Matéo Condat, Maxence Jaulin.
Copyright Maintainer Soraya Lizeth MAQUEDA GUTIERREZ, WANG Ziyan, ZHANG Xizhu.