# EyeTechSolutions

Exercise to test JS, jQuery and Spring Boot working together

## Exercise

Consider an infinite grid of white and black squares.

The grid is initially all white and there is a machine in one cell _facing right_.

It will move based on the following rules:
- If the machine is in a __white square__, turn 90° *clockwise* and move forward 1 unit;
- If the machine is in a __black square__, turn 90° *counter-clockwise* and move forward 1 unit;
- At every move *flip the color* of the base square.

Implement an application that will receive *HTTP PUT* requests with a number of steps the simulation should run, always starting from the same conditions, and output the resulting grid to a file.

Please provide support documentation.

## Scope

### Front-end

- Use of `HTML` and `Javascript` to display the different elements and add the events trigger for the different actions: update color, drag&drop machine and start steps.

- Use of `jQuery` as a protocol to consume HTTP request against the server.

### Back-end

Implemented in `Java` and `Spring Boot` to:
- Use the component `@Controller` to serve the template: [machine/grid](http://localhost:8080/machine/grid)
- Use the component `@Controller` to serve the `JSON` data with the next instructions for the machine
- Use the component `@Service` to delegate the responsability of the logic to this layer.
- Use models to parse the JSON objects.

## Installation

Once the project is pulled in your computer, you can proceed to import it in __Eclipse__.

Then, you can execute the command below to update all the dependencies:

>mvn clean install

Because `Spring Boot` already has `Tomcat` embeeded, you can now run the project as _Spring project_. No extra configuration is required.

Running on local, you can refer to the following link:

> http://localhost:8080/machine/grid

## Considerations

I did not control the delay with the AJAX requests. This can make some constraints.

I did not implement to export to a file. The information was not clear about what should be exported.

As infinite, I considered that the machine can move without not border limits. This means that when it reachs one extreme, next step will appear in the opposite one.

## HowTo

In order to play:

- Drag the machine in any cell on the grid.

- Define how many steps you want the machine to move.

- Start the automation.