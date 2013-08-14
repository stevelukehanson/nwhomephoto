<?php
header('Content-disposition: attachment; filename=invoice.txt');
header('Content-type: text/plain');
readfile('invoice.txt');
?>