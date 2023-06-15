import Footer from "./Footer";
import Header from "./Header";
import React from "react";

export default function About() {
  return (
    <>
      <div className="dark:bg-gray-900 pb-12 min-h-screen bg-cover bg-[url('https://thumbs.dreamstime.com/b/taipei-taiwan-may-large-pile-retro-video-game-controllers-old-school-video-game-controllers-151461269.jpg')] bg-no-repeat">
        <Header />
        <div className="bg-white text-left bg-opacity-70 lg:mx-48 mx-8 my-12 p-8 flex flex-col ">
          <p className="font-bold text-4xl text-gray-900 ">
            A Little About Us...
          </p>
          <p className="font-bold text-2xl text-gray-900">
            Welcome To Console Nostalgia Heaven!
          </p>
          <div className="text-lg font-medium">
            <p>
              Hi Guys, first off I am doing this by myself so please be kind,
              feel free to give suggestions and report any mistakes in the
              discord. I aim to build a community around this.
            </p>

            <p>
              I want to supply a console kiosk nationwide that will have an
              interactive and educational element to show the general public
              what the said console was used for and share information that
              could have been lost over time. also, giving the viewer a chance
              to have a go at coding and debugging.
            </p>

            <p className="font-bold">
              Some things you can expect to see coming soon:
            </p>

            <ul class="list-disc">
              <li class="italic">
                I will be attending many retro gaming expos with a scaled-down
                version of the displays that will go into the museums.
              </li>
              <li class="italic">
                I want to host gaming tournaments in-depth videos on the kits I
                have.
              </li>
              <li class="italic">
                Giveaways including dev and retail kits and so much more
              </li>
              <li class="italic">
                I loved collecting but didn't just want to hoard them in a
                private collection. Many people may or may not know about these
                kits, and for one reason or another, they will probably never
                see these in person or even be able to get a chance to use them.
                This is what I want to change with an interactive showpiece the
                public can see and use.
              </li>
              <li class="italic">
                I also want to spotlight the retro gaming/pc museums that will
                work with me, promoting what will be on display and where and
                when you can see them.
              </li>
            </ul>

            <p className="font-bold">
              If you are a museum interested in showing one of my displays
              please fill in the application form on the museum page.
            </p>
          </div>
          {/* <p className="text-lg p-4 font-bold text-gray-900 text-center">
            {" "}
            Hi Guys, first off I am doing this by myself so please be kind, feel
            free to give suggestions and report any mistakes in the discord. I
            aim to build a community around this. I want to supply a console
            kiosk nationwide that will have an interactive and educational
            element to show the general public what the said console was used
            for and share information that could have been lost over time. also,
            giving the viewer a chance to have a go at coding and debugging.
            some things you can expect to see coming soon: I will be attending
            many retro gaming expos with a scaled-down version of the displays
            that will go into the museums. I want to host gaming tournaments
            in-depth videos on the kits I have giveaways including dev and
            retail kits and so much more I loved collecting but didn't just want
            to hoard them in a private collection. Many people may or may not
            know about these kits, and for one reason or another, they will
            probably never see these in person or even be able to get a chance
            to use them. This is what I want to change with an interactive
            showpiece the public can see and use. I also want to spotlight the
            retro gaming/pc museums that will work with me, promoting what will
            be on display and where and when you can see them. if you are a
            museum interested in showing one of my displays please fill in the
            application form on the museum page.{" "}
          </p> */}
        </div>
      </div>
      <Footer />
    </>
  );
}
