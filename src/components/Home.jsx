import React from "react";

export default function Home() {
  return (
    <div className="w-screen border bg-gray-100">
      <br />
      {/* Use flex-col for small screens and md:flex-row-reverse for larger screens */}
      <div className="flex flex-col md:flex-row-reverse justify-center items-center w-full h-full px-4">
        {/* Image section - Adjusted width and height for responsiveness */}
        <div className="w-full md:w-[50vw]">
          <img
            src="hero2.avif"
            className="w-full h-auto" // Ensures image scales properly for all screen sizes
            alt="Hero"
          />
        </div>

        {/* Text section - Adjusted padding and width for responsiveness */}
        <div className="w-full md:w-[50vw] p-4">
          <div className="text-2xl font-bold my-3 text-primary">
            Fast. Simple. Impactful.
          </div>
          <div className="text-3xl font-bold my-3 text-accent">
            Craft Your Perfect Resume with Ease
          </div>
          <div className="text-lg my-3">
            Whether you're starting fresh or refining an existing resume, our
            platform empowers you to showcase your skills, experience, and
            personality on a resume that gets noticed. Build your professional
            future today—your dream job is just a resume away!
          </div>
          {/* Buttons are spaced evenly and scale slightly on hover */}
          <div className="flex flex-col md:flex-row justify-around">
          <button className="border rounded-xl px-8 py-2 my-3 bg-primary hover:scale-105 hover:bg-secondary-400 w-full md:w-auto">
              Create New Resume
            </button>
            <button className="border rounded-xl px-8 py-2 my-3 border border-primary hover:scale-110 hover:bg-white w-full md:w-auto">
              Improve Resume
            </button>
          </div>
        </div>
      </div>

      {/* Step-by-step section - Responsive grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center m-2">
        <div>
          <img src="step1.png" alt="Step 1" className="mx-auto w-1/2 md:w-2/3" />
          <p className="text-3xl my-2">Pick resume template</p>
          <p className="text-lg my-2">
            Pick a resume template. Choose a sleek design and layout to get
            started.
          </p>
        </div>
        <div>
          <img src="step2.png" alt="Step 2" className="mx-auto w-1/2 md:w-2/3" />
          <p className="text-3xl my-2">Fill in the blanks</p>
          <p className="text-lg my-2">
            Type in a few words. Let the resume builder auto-fill the rest.
          </p>
        </div>
        <div>
          <img src="step3.png" alt="Step 3" className="mx-auto w-1/2 md:w-2/3" />
          <p className="text-3xl my-2">Customize your document.</p>
          <p className="text-lg my-2">
            Make it truly yours.
            <br /> Uniqueness in a few clicks.
          </p>
        </div>
      </div>

      {/* Highlight section - Adjusted grid layout for responsiveness */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-200 rounded-lg shadow-lg">
        <div>
          <img
            src="login.webp"
            alt="Resume Example"
            className="w-full h-auto" // Scales image properly for all screen sizes
          />
        </div>
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Change Your Resume. Change Your Life.
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            <strong>Your Website Name Resume Builder</strong> – Not just a tool,
            but a personal career expert. Your resume deserves to stand out, and
            we’re here to help you make it happen. With our expertly designed
            templates, you can give your resume a fresh look and highlight your
            skills like never before.
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
            <li>
              Click on ready-to-use expert suggestions to build your resume in
              minutes.
            </li>
            <li>
              Impress recruiters with sleek, professional designs that capture
              attention.
            </li>
            <li>
              Show employers your true potential—you’re the best candidate for
              the job.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
