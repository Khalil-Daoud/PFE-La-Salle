
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { ArrowRight } from 'lucide-react';

// const Hero = () => {
//   return (
//     <section className="relative min-h-screen flex items-center">
//       {/* Background */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
//         <img 
//           src="https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
//           alt="Premium tech products" 
//           className="w-full h-full object-cover"
//         />
//       </div>
      
//       {/* Content */}
//       <div className="container mx-auto px-6 pt-40 relative z-10">
//         <div className="max-w-2xl animate-slide-down">
//           <div className="inline-block mb-6">
//             <span className="bg-primary/20 text-primary text-sm font-medium px-4 py-1.5 rounded-full">
//               Premium Tech Collection
//             </span>
//           </div>
          
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-md">
//             Discover Exceptional Technology 
//           </h1>
          
//           <p className="text-lg md:text-xl text-white/100 mb-8 max-w-xl leading-relaxed drop-shadow-sm">
//             Curated selection of premium devices designed to elevate your lifestyle. From cutting-edge audio to stunning displays.
//           </p>
          
//           <div className="flex flex-wrap gap-4">
//             <Button asChild size="lg" className="rounded-full transition-all duration-300 hover:translate-y-[-2px]">
//               <Link to="/products">
//                 Shop Collection <ArrowRight className="ml-2 h-4 w-4" />
//               </Link>
//             </Button>
            
//             <Button asChild variant="outline" size="lg" className="bg-white/50 backdrop-blur-sm border-white/100 text-black rounded-full hover:bg-white/100 transition-all duration-300 hover:translate-y-[-2px]">
//               <Link to="/about">
//                 Learn More
//               </Link>
//             </Button>
//           </div>
//         </div>
//       </div>
      
//       {/* Bottom Fade */}
//       <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent"></div>
//     </section>
//   );
// };

// export default Hero;


import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
        <img 
          src="https://t3.ftcdn.net/jpg/05/92/50/04/360_F_592500458_VqmTscfnn6jBW8rBGSlZLWewNbmJDxrP.jpg"  style={{marginTop: '60px'}}
          alt="Ooredoo Home Internet" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pt-40 relative z-10">
        <div className="max-w-2xl animate-slide-down">
          <div className="inline-block mb-6">
            <span className="bg-red-100 text-red-600 text-sm font-medium px-4 py-1.5 rounded-full">
              Ooredoo Digital Store
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-md">
            Connecté à l’essentiel. Boosté par Ooredoo.
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl leading-relaxed drop-shadow-sm">
            Découvrez nos forfaits mobiles, box Internet, équipements 4G/5G et bien plus encore. Simple, rapide, digital.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-full transition-all duration-300 hover:translate-y-[-2px]">
              <Link to="/products">
                Découvrir les offres <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="bg-white/50 backdrop-blur-sm border-white text-black rounded-full hover:bg-white transition-all duration-300 hover:translate-y-[-2px]">
              <Link to="/about">
                En savoir plus
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
