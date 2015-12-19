(ns day17.core
  (:require [clojure.math.combinatorics :as combo])
  (:gen-class))

(def nums (->> (slurp "input.txt")
              (re-seq #"\d+")
              (map read-string)
              (into [])))

(defn -main
  []
  (let [conts-with-150
          (->> (combo/subsets (range (count nums)))
              (map #(vals (select-keys nums %)))
              (filter #(= (apply + %) 150)))
        count-list (map #(count %) conts-with-150)
        min-num (apply min count-list)
        min-count (count (filter #(= min-num %) count-list))]
        (println min-count)
  ))
