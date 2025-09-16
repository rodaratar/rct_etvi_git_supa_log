// supabaseClient.js
//import { createClient } from '@supabase/supabase-js';

//const supabaseUrl = 'https://ygdoofsevlrtfrgshifj.supabase.co';
//const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnZG9vZnNldmxydGZyZ3NoaWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNzAwMDIsImV4cCI6MjA3MTc0NjAwMn0.l7pWMPejmO_yRAdg-mMMBezBNQABU0Zwk4P6d9iivvA';

//export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ygdoofsevlrtfrgshifj.supabase.co' // cambia por tu URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnZG9vZnNldmxydGZyZ3NoaWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNzAwMDIsImV4cCI6MjA3MTc0NjAwMn0.l7pWMPejmO_yRAdg-mMMBezBNQABU0Zwk4P6d9iivvA'; // cambia por tu anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

window.onload = async () => {
    const hash = window.location.hash

    if (hash.includes('access_token')) {
        const params = new URLSearchParams(hash.substring(1))
        const session = {
            access_token: params.get('access_token'),
            refresh_token: params.get('refresh_token'),
            expires_in: parseInt(params.get('expires_in')),
            token_type: params.get('token_type'),
        }

        const { error } = await supabase.auth.setSession(session)
        if (error) {
            console.error('Error setting session:', error.message)
        } else {
            console.log('Sesión iniciada con éxito')
            // Limpia la URL para no mostrar el token
            window.history.replaceState(null, null, window.location.pathname)
            // Aquí puedes redirigir al usuario a la página principal o dashboard
        }
    }
}