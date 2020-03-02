# App-Q-Methodology
Year 3 Napier group project

npm install
npm install --save axios 
npm install rebass
npm install react-router-dom
npm install react-router

If you go to App.js and change this:

    const HomePage = () => (
        <div>
            <Home />
        </div>
    );

To this:

    const HomePage = () => (
        <div>
            <Test />
        </div>
    );

You will see that the page displayes the string that is placed in
Contex.js file, like this:

    state = {
        id: 'TEST',
        updateID: this.updateID,
    };

If you go to the Test.js file you will see the basic set up 
to display it.
I'm trying to figure out how to display this string in Home.js file.
If you change it back to this in the App.js like it was before so:

    const HomePage = () => (
        <div>
            <Home />
        </div>
    );

You will get an error like this: newChildren = render(newValue);
I google it and some people had simiallr issues 
so if you could try and find the solution to this that would be great! :D

I followed this tutorial to apply the Context:

https://dev.to/sunnysingh/sharing-state-using-reacts-context-api-3623


