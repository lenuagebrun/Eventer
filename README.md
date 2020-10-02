# Eventer

This is a team project conducted in accordance with the software engineering immersive program at General Assembley.

# Description

Eventer is a web-based application that enables users to use the Google Maps API to create custom events at locations. These events would enable other users in the area to join the event and give a responsive layout as to the amount of people intending to go to a specific event. In addition, each event would be tied to a chat room that enabled attendees to be able to communicate and share the experience of the event with one another while simultaneiously enabling event managers to quickly dispatch notices to all attendees.  

# Link to Site

https://gaemr.herokuapp.com/accounts/login/

# Installation

### For non-Windows users:

```
git clone https://github.com/rahulgupta15/generalassemblyemr
cd eventer

npm i
npm start

```

# Useage

### Login Portal

Create an account in order to gain access to the create event functionality.

[Imgur](https://imgur.com/2Zy1Ee4)

### Account Registration Portal

Complete a multiple-field form in order to register account. Following a succesful registration, you will immediately be redirect to the appropriate view.

![Imgur Image](https://i.imgur.com/H8PTERN.png)

### Create Event View

Upon a succesful login from a 'doctor' account you will be greeted with the following view.

![Imgur](https://imgur.com/xkG113K)

### Map View

Upon a succesful login from a 'patient' account you will be greeted with the following view.

![Imgur](https://imgur.com/XMVncG0)

# Future Enhancements 

Currently the UI and much of the functionality of the website is unimplemented or unrefined.

### Functionality - Map

* Google Maps API User Agreement 10.1.3(b) states that caching latlong data in order to quickly create overlays using the Google Maps API is a clear violation of the terms of service. In order to restore the inteded functionality of the site, a critical refactoring of the data model is needed if users are to be able to create custom events.
* Currently, the map is incapable of rendering markers from the database. As a result, this view is largely incapable of actually rendering any information from the database.

### Functionality - Profile page

* The profile page functionality isn't available and although users can log in with an accompanying change of state variables in the App.js file, that information is currently not being displayed anywhere.
* A user profile template needs to be created.

### Functionality - Chat Rooms

* We were unable to dedicate the time and resources neccesary to implement this feature or the accompanying data model that would neccesary to get it work. 

### UI

* Map view currently obstructs page.
* Dynamic rendering of "logged-in user experience" is not currently possible.
* Profile view is currently not functional.
* There are no correct transitions betweent he seperate views.
* Forms are not correctly formated, although semantic-ui is installed.

### Dependencies 

```
    "@react-google-maps/api": "^1.10.1",
    "axios": "^0.18.1",
    "bootstrap": "^4.3.1",
    "react": "^16.8.6",
    "react-datepicker": "^2.5.0",
    "react-dom": "^16.8.6",
    "react-router-dom": "^5.2.0",
    "react-scripts": "^3.4.3",
    "semantic-ui-css": "^2.4.1",
    "semantic-ui-react": "^1.3.1"

```


# Credits

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><img src="https://avatars0.githubusercontent.com/u/68161992?s=460&u=65092f7ea36ec42362d806f57d9b573326c1516e&v=4" width="100px;" alt=""/><br /><sub><b>Pierre-Alexandre Julien</b></sub></a><br /><a href="https://github.com/lenuagebrun">💻</a></td>
    <td align="center"><img src="https://avatars1.githubusercontent.com/u/63525891?s=400&v=4" width="100px;" alt=""/><br /><sub><b>Ahmed Jamal</b></sub></a><br /><a href="https://github.com/AhmedJamal93" title="Code">💻</a></td>
    <td align="center"><img src="https://i.imgur.com/AciEwUR.jpg" width="100px;" alt=""/><br /><sub><b>Noah Eror</b></sub></a><br /><a href="https://github.com/BitterHippo" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

