(ns day12.core
  (:gen-class)
  (:require [clojure.data.json :as json]
            [clojure.walk :as w]))

(def input-map (json/read-str (slurp "data.json") :key-fn keyword))

(defn sum-map-pt1 [mp]
  (w/walk #(cond (number? %) %
                (string? %) 0
                (map? %) (sum-map-pt1 (vals %))
                :else (sum-map-pt1 %))
        #(apply + %)
        mp))

(defn sum-map-pt2 [mp]
    (w/walk #(cond (number? %) %
                  (string? %) 0
                  (map? %) (if (some (fn [item] (= "red" item)) (vals %))
                             0
                             (sum-map-pt2 (vals %)))
                  :else (sum-map-pt2 %))
           #(apply + %)
           mp))

(defn -main
  "I don't do a whole lot."
  [& args]
  (println (sum-map-pt2 input-map)))
