(ns day13.core
  (:require [clojure.math.combinatorics :as combo]
            [clojure.set :as set-fns])
  (:gen-class))

;; Read input into a map with set of two people as the key and happiness as val
;; Gen permutations for all combos of people
;; Partition each arrangement into groups of two, map this to value
;; keep a max happiness
;; return max happiness

(def input-str (slurp "input.txt"))

(defn input->tuples [input]
  (map #(drop 1 %)
       (re-seq #"([A-Z][a-z]+).*(gain|lose) ([0-9]+).*([A-Z][a-z]+)\." input)))

(defn tuple->map [[p1 gain-str amt p2]]
  (let [amt (read-string amt)]
      {#{p1 p2} (if (= gain-str "gain") amt (- amt))}))

(defn tuples->map [tuples]
  (->> (map tuple->map tuples)
       (apply merge-with +)))

(defn get-person-vector [mp]
  (->> (keys mp)
       (reduce set-fns/union #{})
       (into [])))

(defn get-total [s happy-map]
  (let [with-front (conj (into [] s) (first s))]
    (->> (partition 2 1 with-front)
         (map #(get happy-map (into #{} %) 0))
         (reduce + 0))))

(defn -main
  "I don't do a whole lot."
  [& args]
  (let [happy-map (-> input-str (input->tuples) (tuples->map))
        person-vec (conj (get-person-vector happy-map) "me")]
    (println
     (->> (combo/permutations person-vec)
          (map #(get-total % happy-map))
          (reduce max)))))
