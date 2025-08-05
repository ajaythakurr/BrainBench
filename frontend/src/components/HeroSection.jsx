import {BadgeCheck} from 'lucide-react';
export default function HeroSection(){
    return(
        <div className="flex flex-col justify-center items-center  p-5 bg-gray-100">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Your Gateway to{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Smarter Exams
            </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Create, take, and manage exams effortlessly with our comprehensive online platform. 
                Streamline your assessment process and enhance learning outcomes.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg text-lg font-medium">
                Get Started →
            </button>

            <div className="text-xs flex gap-7 mt-4">
                
                <div className="flex flex-center ">
                <BadgeCheck className="text-green-600 w-4 h-4 mr-1" />
                    <span>Free To Start</span>
                </div>

                <div className="flex flex-center ">
                <BadgeCheck className="text-green-600 w-4 h-4 mr-1" />
                    <span>Unlimited Exams</span>
                </div>

                <div className="flex flex-center ">
                <BadgeCheck className="text-green-600 w-4 h-4 mr-1" />
                    <span>Real Time Results</span>
                </div>
            </div>

        </div>
    )
}