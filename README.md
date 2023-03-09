<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

A squad of robotic rovers are to be landed by NASA on a plateau on Mars.

This plateau, which is curiously rectangular, must be navigated by the rovers so that their onboard cameras can get a complete view of the surrounding terrain to send back to Earth.

A rover's position is represented by a combination of an x and y co-ordinates and a letter representing one of the four cardinal compass points. The plateau is divided up into a grid to simplify navigation. An example position might be 0, 0, N, which means the rover is in the bottom left corner and facing North.

To control a rover, NASA sends a simple string of letters. The possible letters are 'L', 'R' and 'M'. 'L' and 'R' makes the rover spin 90 degrees left or right, respectively, without moving from its current spot.

'M' means move forward one grid point and maintain the same heading.

Assume that the square directly North from (x, y) is (x, y+1).



### Built With


* [![React][React.js]][React-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Instructions on setting up your project locally.
To get a local copy up and running follow these simple steps.

### Prerequisites

* nodejs
  
  Go to <a href="https://nodejs.org/en/">https://nodejs.org/en/</a> and install Latest version of node
  

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/abhishekvarmasoftvision/mars-rover.git
   ```
2. Navigate to root project using command prompt.

3. Install NPM packages
   ```sh
   npm install
   ```   
4. Run project
   ```sh
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Usage

1. Provide the Plateau size by entering 2 numbers seperated by space. Example: 7 10, in this case it will create a table with 7 Rows and 10 columns.
2. Provide the Initial position of the Rover. Example: 3 4 N, in this this case it will create position the rover at the 4th column(from left) of the 3rd row and the rover will be heading upwards.
3. Provide command like L, R and M. 'L' and 'R' makes the rover spin 90 degrees left or right, respectively, without moving from its current spot.

'M' means move forward one grid point and maintain the same heading.

Assume that the square directly North from (x, y) is (x, y+1).

<p align="right">(<a href="#readme-top">back to top</a>)</p>





<!-- MARKDOWN LINKS & IMAGES -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://react-bootstrap.github.io/
