<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orderLines', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->integer('quantity')->default(1);
            $table->foreignId('order_id')->constrained(
                table:'orders',indexName: 'OrderLinesOrder'
            )->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('product_id')->constrained(
                table:'products',indexName: 'OrderLinesProduct'
            )->onUpdate('cascade')->onDelete('cascade');
            $table->string('talla');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orderLines');
    }
};
