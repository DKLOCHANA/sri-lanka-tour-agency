import { useState, useEffect, useCallback } from 'react';

export const useTestimonialSlider = (testimonialsLength: number) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-slide testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonialsLength);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonialsLength]);

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonialsLength);
  }, [testimonialsLength]);

  const prevTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
  }, [testimonialsLength]);

  return {
    currentTestimonial,
    setCurrentTestimonial,
    nextTestimonial,
    prevTestimonial
  };
};