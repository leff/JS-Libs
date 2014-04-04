JS-Libs
=======

Trying the same rather complicated example with one or more JS libs/frameworks for comparison purposes.


The problem we're trying to solve is that we want to ask our users some questions very nicely. We're basically asking people to choose from a list, but we have a pretty UX to help people choose. Some of the questions have follow up questions, so the interaction is somewhat complicated.

The data that represents the questions is actually much more complicated than the data that represents the answers. This means that typical Model-View parity that you see in all the MV* examples doesn't really work. So I'm trying to dash out a few quick prototypes with some libraries to see if I can narrow down the options.


# Run the server

* install node
* cd to the directory and
* $ npm start


# Marionette
First up, it's Marionette https://github.com/marionettejs/backbone.marionette

Marionette is the current big cheese in MVC libraries built on top of backbone.

It tries to keep the backbone mentality of allowing you to use as much as you want, but not requiring you to use everything. It has a pretty solid community and is actively commiting.


# Giraffe
Giraffe is very much like Marionette but it seems a bit simpler. The nice thing for our purposes is that it doesn’t require views to be attached to models. This actually makes me want to see what I can do with Model-less views in Marionette.

On the otherhand, Giraffe is not very active and doesn't have a big community around it.


# knockout is out

Best docs i've found on doing reusable html templates with knockout is to do it on the serverside.
http://conficient.wordpress.com/2013/03/07/knockout-multiple-viewmodels-and-reusable-partial-views/
They use Razor Partial Views, but it'd be equivalent to doing {% include /fragments/blah.html %} in python.

No.

Just. No.