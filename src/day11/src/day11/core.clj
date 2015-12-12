(ns day11.core [:gen-class])

(def input-pass "cqjxjnds")
(def bad-set #{8 14 11})

(defn str-to-nums [s]
  (into [] (map #(- (int %) 97) s)))

(defn nums-to-str [nums]
  (apply str
         (map #(char (+ 97 %)) nums)))

(defn inc-pass [pass]
  (let [new-end (rem (inc (nth pass (dec (count pass)))) 26)
        rst (pop pass)]
  (if (zero? new-end)
    (conj (inc-pass rst) new-end)
    (conj rst new-end))))

(defn has-repeats? [pass]
  (->> (partition-by identity pass)
       (filter #(>= (count %) 2))
       (count)
       (<= 2)))

(defn no-bad-letters? [pass]
  (not-any? #(contains? bad-set %) pass))

(defn has-cont-letters? [pass]
  (loop [cnt 0 lst -2 [fst & rst] pass]
    (let [new-cnt (if (= (inc lst) fst) (inc cnt) 1)]
      (cond
         (>= new-cnt 3) true
         (not (seq rst)) false
         :else (recur new-cnt fst rst)
         ))))

(defn valid? [pass]
  (and (has-repeats? pass)
       (no-bad-letters? pass)
       (has-cont-letters? pass)))


(defn -main
  [& args]
  (println (nums-to-str
            (first (filter valid?
                     (iterate inc-pass (str-to-nums input-pass)))))))
