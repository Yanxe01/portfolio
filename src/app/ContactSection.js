
import React, { useState } from 'react';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [responseType, setResponseType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setResponseMessage('');
    setResponseType('');

    // Ganti dengan email Anda
    const FORMSPREE_URL = 'https://formspree.io/f/xdkdvznv'; // Contoh form ID

    const formData = {
      name: name,
      email: email,
      subject: subject,
      message: message,
      _replyto: email, // Formspree akan menggunakan ini sebagai reply-to
    };

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setResponseMessage('Email berhasil dikirim! Terima kasih atas pesan Anda.');
        setResponseType('success');
        // Reset form
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setResponseMessage('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
        setResponseType('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setResponseMessage('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
      setResponseType('error');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Kontak</h2>
        
        <div className={styles.content}>
          {/* Info Kontak Card */}
          <div className={styles.infoCard}>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Email</div>
              <div className={styles.infoValue}>ianlapu98@gmail.com</div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Telepon</div>
              <div className={styles.infoValue}>+62 813 4375 5972 </div>
              <div className={styles.infoValue}>+62 813 4375 5972 </div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Alamat</div>
              <div className={styles.infoValue}>Makassar, JL Bonto Bila 5 No 8</div>
            </div>
          </div>

          {/* Formulir Kontak Card */}
          <div className={styles.formCard}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="name"
                  placeholder="Nama Anda"
                  className={styles.formInput}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Anda"
                  className={styles.formInput}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subjek"
                  className={styles.formInput}
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <textarea
                  name="message"
                  placeholder="Pesan Anda"
                  className={styles.formTextarea}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={styles.submitButton} 
                disabled={isSending}
              >
                <span>
                  {isSending && <span className={styles.loadingSpinner}></span>}
                  {isSending ? 'Mengirim...' : 'Kirim Pesan'}
                </span>
              </button>
            </form>

            {/* Pesan respon */}
            {responseMessage && (
              <div 
                className={`${styles.responseMessage} ${responseType === 'success' ? styles.success : styles.error}`}
              >
                {responseMessage}
              </div>
            )}

            {/* Tautan email langsung */}
            <p className={styles.emailLink}>
              Atau Anda bisa langsung mengirim email ke{' '}
              <a href="mailto:ianlapu98@gmail.com">
                ianlapu98@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

