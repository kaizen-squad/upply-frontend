import apiFetch from "./lib/api";

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.NODE_ENV === 'production') {
    console.log('[Init] Démarrage de l\'initialisation...');
    
    const maxRetries = 5;
    let attempt = 0;
    
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    
    const checkBackendHealth = async (): Promise<boolean> => {
      try {
        // Timeout de 5 secondes pour l'appel API
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Timeout après 5 secondes')), 5000);
        });
        
        const apiPromise = apiFetch<null>('api/health');
        
        const response = await Promise.race([apiPromise, timeoutPromise]) as Awaited<typeof apiPromise>;
        
        if (response?.success) {
          console.log(`[Init] Backend disponible (tentative ${attempt + 1})`);
          console.log(`Message: ${response.message}`);
          return true;
        }
        
        throw new Error(response?.message || 'Health check failed');
      } catch (error) {
        console.error(`[Init] Échec tentative ${attempt + 1}/${maxRetries}:`, 
          error instanceof Error ? error.message : error);
        return false;
      }
    };
    
    const initialize = async () => {
      while (attempt < maxRetries) {
        const isHealthy = await checkBackendHealth();
        
        if (isHealthy) {
          console.log('[Init] Initialisation réussie!');
          return true;
        }
        
        attempt++;
        
        if (attempt < maxRetries) {
          const delay = 10000 * Math.pow(2, attempt - 1); // Backoff exponentiel: 10s, 20s, 40s...
          console.log(`⏳ [Init] Nouvelle tentative dans ${delay / 1000} secondes...`);
          await sleep(delay);
        }
      }
      
      console.error('[Init] Échec définitif: Backend injoignable après 5 tentatives');
      console.warn('[Init] L\'application va démarrer mais les appels backend pourraient échouer');
      
      return false;
    };
    
    // Exécuter l'initialisation sans bloquer le démarrage
    initialize().catch(console.error);
  }
}