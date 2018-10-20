<?php
class Database{
 
    // database credentials
    private $host = "23.98.37.11";
    private $db_name = "groopy01";
    private $username = "groopy_app";
    private $password = "xSHjGgpDDwtpM9T7";
    public $conn;
 
    public function getConnection(){
 
        $this->conn = null;
 
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>