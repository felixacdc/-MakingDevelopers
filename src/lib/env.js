/** 
 * 
 * Gets the current enviroment based on NODE_ENV var.
 * 
 */

export default function getEnv() {
  return {
    name: process.env.NODE_ENV ? process.env.NODE_ENV : 'production'
  };
}
