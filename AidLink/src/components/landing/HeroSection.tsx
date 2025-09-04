import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div>
      <section className="w-full min-h-screen py-20 px-4 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-6">
            <motion.h1 
              className="text-5xl lg:text-6xl font-bold text-foreground leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your Rural Health Companion
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Get instant first-aid guidance, locate nearby health camps, and access essential healthcare information even in remote areas.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button
               className="bg-[var(--primary-color)] px-6 py-4 rounded-xl text-white font-semibold hover:bg-[var(--primary-dark)] shadow-lg hover:shadow-xl transition-all duration-300"
            > Find Health Camps → </button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="relative flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative">
            <motion.img 
              src="https://play-lh.googleusercontent.com/Yp2F23QSjQ0psYGyw4ewaoaWWG_CFkNE1y9pVLXM1DOlelYTXHgCvPFz4uLqUWarcyk=w526-h296-rw"
              alt="RuralCare App Interface"
              className="w-80 h-auto relative z-10 drop-shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.div 
              className="absolute -top-8 -left-8 w-48 h-32 bg-white rounded-xl shadow-lg p-4 z-20"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9RLvDL-Y0KBJwlKIp1XwxfDxm9hS0593Z8g&s" 
                alt="Health Camps Map"
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>

            <motion.div 
              className="absolute -bottom-4 -right-8 w-24 h-24 bg-[var(--primary-color)] rounded-full shadow-lg flex flex-col items-center justify-center z-20"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <div className="text-2xl text-white font-bold text-health-primary">24/7</div>
              <div className="text-sm text-white text-muted-foreground">Help</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
    </div>
  )
}

export default HeroSection
