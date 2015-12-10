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
  (loop [cnt 0 str input-str]
    (if (>= cnt 50)
      (println (count str))
      (recur (inc cnt) (look-and-say str)))))
