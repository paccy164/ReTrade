  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      console.log("Submitting login for:", email); // Reba muri Console ya browser
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("Supabase response:", { data, error }); // Reba icyo Supabase igarura

      if (error) throw error;

      if (data?.session) {
        console.log("Login successful, redirecting...");
        window.location.href = '/dashboard';
      } else {
        setErrorMsg('Session could not be established. Please try again.');
      }
    } catch (err: any) {
      console.error("Login catch error:", err);
      setErrorMsg(err.message || 'Habaye ikibazo mu kwinjira, ongera ugerageze.');
    } finally {
      setLoading(false);
    }
  };
