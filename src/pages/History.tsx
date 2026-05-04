import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { ArrowLeft, FileText, ScrollText, Trash2, Eye, Download, Clock } from 'lucide-react';

interface Record {
  id: string;
  receipt_no: string;
  data: any;
  created_at: string;
  type: 'agreement' | 'receipt';
}

const History = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'agreement' | 'receipt'>('all');

  useEffect(() => {
    if (user) loadRecords();
  }, [user]);

  const loadRecords = async () => {
    setLoading(true);
    const [{ data: agreements }, { data: receipts }] = await Promise.all([
      supabase.from('sales_agreements').select('*').order('created_at', { ascending: false }),
      supabase.from('sales_receipts').select('*').order('created_at', { ascending: false }),
    ]);

    const all: Record[] = [
      ...(agreements || []).map(a => ({ ...a, type: 'agreement' as const })),
      ...(receipts || []).map(r => ({ ...r, type: 'receipt' as const })),
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    setRecords(all);
    setLoading(false);
  };

  const handleDelete = async (record: Record) => {
    if (!confirm(`Delete ${record.type === 'agreement' ? 'agreement' : 'receipt'} ${record.receipt_no}?`)) return;
    setDeleting(record.id);
    const table = record.type === 'agreement' ? 'sales_agreements' : 'sales_receipts';
    const { error } = await supabase.from(table).delete().eq('id', record.id);
    if (error) {
      toast.error('Failed to delete');
    } else {
      toast.success('Deleted successfully');
      setRecords(prev => prev.filter(r => r.id !== record.id));
    }
    setDeleting(null);
  };

  const handleView = (record: Record) => {
    const path = record.type === 'agreement' ? '/sales-agreement' : '/sales-receipt';
    navigate(`${path}?id=${record.id}`);
  };

  const filtered = filter === 'all' ? records : records.filter(r => r.type === filter);

  const getLabel = (record: Record) => {
    const d = record.data as any;
    if (record.type === 'agreement') return d.buyerName || d.sellerName || 'Untitled';
    return d.customerName || d.brandModel || 'Untitled';
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-brand-black border-b border-primary/30 sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="flex items-center gap-1 text-xs text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h1 className="text-base sm:text-xl font-bold tracking-tight text-primary-foreground">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1.5" />
              Document <span className="text-primary">History</span>
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-4">
          {(['all', 'agreement', 'receipt'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {f === 'all' ? 'All' : f === 'agreement' ? 'Agreements' : 'Receipts'}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-16 text-muted-foreground">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">No documents found</p>
            <p className="text-muted-foreground/60 text-xs mt-1">Save a receipt or agreement to see it here</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(record => (
              <div key={record.id} className="flex items-center gap-3 p-3 sm:p-4 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  record.type === 'agreement' ? 'bg-primary/10' : 'bg-accent/10'
                }`}>
                  {record.type === 'agreement' ? <ScrollText className="w-5 h-5 text-primary" /> : <FileText className="w-5 h-5 text-primary" />}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{getLabel(record)}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                      record.type === 'agreement' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-primary'
                    }`}>
                      {record.type}
                    </span>
                    <span className="text-xs text-muted-foreground">{record.receipt_no}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(record.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleView(record)}
                    className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    title="View & Edit"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(record)}
                    disabled={deleting === record.id}
                    className="p-2 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
