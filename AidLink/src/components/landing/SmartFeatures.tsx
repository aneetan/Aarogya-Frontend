import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaRobot } from 'react-icons/fa';

const SmartFeatures = () => {
  return (
   <section className="w-full py-20 px-8 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                Smart healthcare<br />
                at your fingertips
              </h2>
              <p className="text-xl text-gray-600">
                Access instant first-aid guidance and find nearby health facilities.
              </p>
            </div>

            <div className="grid gap-6">
              <motion.div 
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-[var(--primary-color)] rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaRobot className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">AI First-Aid Chatbot</h3>
                  <p className="text-muted-foreground">
                    Get instant, step-by-step emergency response guidance with our intelligent chatbot trained on medical protocols.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-[var(--primary-color)] rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Health Camp Locator</h3>
                  <p className="text-muted-foreground">
                    Find the nearest health camps in your area.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <motion.img 
                src="https://www.improvingphc.org/sites/default/files/case-study/image/2019/08/B4%20Nepal%20%28possible%29.jpg" 
                alt="Health Camps Map Interface"
                className="w-95 h-auto drop-shadow-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <motion.div 
                className="absolute -bottom-8 -left-6 bg-white rounded-xl shadow-lg p-4 w-30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="text-2xl font-bold text-[var(--primary-color)]">12</div>
                <div className="text-sm text-gray-600">Health camps nearby</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SmartFeatures
