import { Loader2 } from "lucide-react";

function Loader(){
    return(
        <>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white">

            <div className="flex flex-col items-center gap-6">

                {/* Spinner */}
                <Loader2 className="h-12 w-12 animate-spin text-violet-500" />

                {/* Text */}
                <div className="text-center">
                <h2 className="text-xl font-semibold tracking-wide">
                    Initializing Secure Server
                </h2>
                <p className="text-sm text-zinc-400 mt-2">
                    Please wait while we connect to the backend...
                </p>
                </div>

            </div>

        </div>
        </>
    )
}

export default Loader;