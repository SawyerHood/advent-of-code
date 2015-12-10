(ns day10.core
  (:gen-class))

(def input-str "1113122113")

(defn look-and-say [s]
  (->> (partition-by identity s)
       (map #(vector (count %) (first %)))
       (flatten)
       (apply str)))

(defn -main
  [& args]
  (println (count (nth (iterate look-and-say input-str) 50))))
