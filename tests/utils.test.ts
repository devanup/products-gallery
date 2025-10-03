import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce, formatPrice, formatRating } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('debounce', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should delay function execution', () => {
      const fn = vi.fn();
      const debouncedFn = debounce(fn, 300);

      debouncedFn('test');
      expect(fn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(300);
      expect(fn).toHaveBeenCalledWith('test');
    });

    it('should cancel previous calls', () => {
      const fn = vi.fn();
      const debouncedFn = debounce(fn, 300);

      debouncedFn('first');
      vi.advanceTimersByTime(100);
      debouncedFn('second');
      vi.advanceTimersByTime(100);
      debouncedFn('third');
      vi.advanceTimersByTime(300);

      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith('third');
    });
  });

  describe('formatPrice', () => {
    it('should format price with currency symbol', () => {
      expect(formatPrice(99.99)).toBe('$99.99');
      expect(formatPrice(1000)).toBe('$1,000.00');
    });
  });

  describe('formatRating', () => {
    it('should format rating to one decimal', () => {
      expect(formatRating(4.567)).toBe('4.6');
      expect(formatRating(3)).toBe('3.0');
    });
  });
});
